
const User			= require('../Model/user');
const jwt			= require('jsonwebtoken');
const { jwtSecret }	= require('../Config/Config/config');
const bcrypt      	= require('bcryptjs');
const async     = require("async");
const nodemailer = require("nodemailer");
const crypto    = require("crypto");


module.exports ={
    signin(req,res){
    	try{
			User.findOne({ email: req.body['email'] }, (err, user) => {
				if (err)  return   res.status(404).send({
					success: false,
					message: 'Failed '+ err
				});
				
				if (!user) {
					return res.status(400).send({
						success: false,
						message:'Either your email/password is incorrect. Please try again'
					});
					
				} else if (user) {
					// var validPassword = user.comparePassword(req.body.password);
					let validPassword = bcrypt.compareSync(req.body['password'], user['password']);
					if (!validPassword) {
						return res.status(400).send({
							success: false,
							message:'Either your email/password is incorrect. Please try again'
						});
						
					} else {
						let token = jwt.sign({
							user: user["_id"]
						}, jwtSecret, {
							expiresIn: '1d'
						});
						return res.status(200).send({
							success: true,
							token: 'Bearer'+ ' '+token
						});
					}
				}
			});
		}catch(error){
			return res.status(400).send({
				success: false,
				message: error
			});
		}
	},
	signup(req,res){
		let user 		 = new User();
		user.name 		 = req.body.name;
		user.email 		 = req.body.email;
		user.password 	 = bcrypt.hashSync(req.body['password'], 10);
		User.findOne({ email: req.body.email }, (err, existingUser) => {
		if (err) return  res.status(400).send({
				success: false,
				message: [{msg:'Failed '+err}]
			});
			if (existingUser) {
				return res.status(400).send({
					success: false,
					message: [{msg:'Account with that email is already exist'}]
			});
			} else {
				if (req.body['password'] == req.body['cpassword']){
					user.save();
					res.status(200).send({
						success: true,
						message: [{msg:'Success Register User'}]
					});
				}else{
					return res.status(400).send({
						success: false,
						message: [{ msg: 'Password and Confirm Password not same' }]
					});
				}
			}
		});
	},
	getProfile(req,res){
		try{
			User.findOne({ _id: req.decoded['_id'] },['name', 'email','status'], (err, data)=>{
				
				if (err)  return  res.status(404).send({
					success: false,
					message: 'Failed '+ err
				});
				res.status(200).send({
					success: true,
					user: data
				});
			});
		}catch(error){
			return res.status(400).send({
				success: false,
				message: error
			});
		}
	},
	forgotPassword(req,res){
		
		async.waterfall([
			(done)=> {
				crypto.randomBytes(20, (err, buf) => {
					let token = '';
					let password='';
					token = buf.toString('hex');
					password = bcrypt.hashSync(token, 10);
					done(err, password,token);
				});
				
				
			},
			(password,token,done)=>{
				User.findOneAndUpdate({ email: req.body['email'] }, { password: password }, (err, user) => {

					if (!user) {
						return res.status(400).send({
							success: false,
							message: [{ msg: 'User is not exist' }]
						});
					}
					done(err, token, user);
				});
			},
			(token,user, done)=> {
				let smtpTransport = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: 'notification.ur@gmail.com',
						pass: 'notification@ur90'
					}
				});
				let mailOptions = {
					to: user.email,
					from: 'notification.ur@gmail.com',
					subject: 'Password Reset',
					text: 'ini password email kamu:\n\n' +
						'Password:' + token
				};
				smtpTransport.sendMail(mailOptions, (err)=> {
					res.status(200).send({
						success: true,
						message: 'Success Reset Password'
					});
					done(err, 'done');
				});
			}
		], (err)=> {
			if (err) 
				res.status(400).send({
					success: false,
					message: 'Failed Reset Password'
				});
		});
	},
};