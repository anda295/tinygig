module.exports = function (app, Service) {

	app.get("/", function (req, res) {
		res.render('landing.ejs', {
			navBar: true
		});
	});
	app.get("/about", function (req, res) {
		res.render('about.ejs', {
			navBar: true
		});
	});

	app.get("/project", function (req, res) {
		res.render('submitProject.ejs', {
			navBar: true
		});
	});

	app.get("/job", function (req, res) {
		res.render('submitJob.ejs', {
			navBar: true,
		});
	});

	app.get('/job/:id', async function (req, res) {
		let job = await Service.getJob(req.params.id);
		res.render('jobView.ejs', { job, navBar: true });
	});

	app.get('/jobsPaginated', async function (req, res) {
		var page = req.param('page');
		if (!page)
			page = 0;
		var tagName = req.param('tag');

		let jobs = await Service.getJobs(tagName, page);

		res.status(200).send(jobs);
	});

	app.get("/jobs", async (req, res) => {
		var tagName = req.param('tag');
		let jobName = '';
		if (tagName && tagName.length > 0) {
			jobName = tagName;
		}
		let jobs = await Service.getJobs(tagName, 0);

		res.render('jobBoard.ejs',
			{
				jobs: jobs,
				jobName: jobName
			});
	});

	app.get("/maker", function (req, res) {
		res.render('registerDev.ejs', {
			data: {
				email: "",
				name: "",
				tech: "",
				projects: ""
			},
			navBar: true,
			errors: {}
		});
	});
	app.get("/error", function (req, res) {
		res.render('error.ejs', {
			navBar: true
		});
	});

	app.post("/workonproj", function (req, res) {
		let data = {
			email: req.body.email,
			name: req.body.name,
			tech: req.body.tech,
			workType: req.body.workType,
			projects: req.body.projects
		};
		Service.existingEmail(data.email, (existingEmail) => {
			if (existingEmail) {
				res.render('registerDev.ejs', {
					data: req.body,
					errors: { email: "Email already submited!" },

					navBar: true,

				});
			} else {
				Service.saveDev(data).then(
					() => {
						return res.render('thanks.ejs', {
							navBar: true
							, title: ' Access requested!', description: "Thanks for your application, we'll review your profile and we'll get back to you ASAP!"
						})
					});
			};
		});

	});

	app.post("/submitProject", function (req, res) {
		let data = {
			email: req.body.email,
			name: req.body.name,
			tagLine: req.body.tagLine,
			tech: req.body.tech,
			budget: req.body.budget,
			description: req.body.description,
		};
		var promise = Service.saveProject(data);
		promise.then(() => {
			return res.render('thanks.ejs', {
				navBar: true,
				title: 'Project received!', description: " Thank you for posting! After we will review your project details you are going to receive a email with the payment details. <br/> Immediately after the payment is received the project will reach to our amazing women makers community."
			})
		});
	});

	app.post("/submitJob", function (req, res) {
		let data = {
			email: req.body.email,
			companyName: req.body.companyName,
			jobTitle: req.body.jobTitle,
			tech: req.body.tech,
			applyUrl: req.body.applyUrl,
			description: req.body.description,
		};
		var promise = Service.saveJob(data);
		promise.then(() => {
			return res.render('thanks.ejs', {
				navBar: true,
				title: 'Job submited!', description: " Thank you for posting! After we will review your job details you are going to receive a email with the payment details. <br/> Immediately after the payment is received the job post will go live."
			})
		});
	});
};

