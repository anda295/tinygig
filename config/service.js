const Dev = require('./models/dev');
const Project = require('./models/project');
const Job = require('./models/job');
const url = require('url');

class Service {
	async getJobs(tagName, page) {
		let query = { status: "done" };
		if (tagName) {
			query = { status: "done", tech: tagName }
		}
		// const jobs = await Job.find(query).sort({ 'date': -1 }).skip(page * 20).limit(20).exec();

		const jobs = await Job.find(query).sort({ 'date': -1 }).exec();
		return this.parseJobs(jobs);
	}
	async getJob(id) {
		return Job.findById(id).exec();
	}
	saveJob(data) {
		let job = new Job({
			jobTitle: data.jobTitle,
			tech: JSON.parse(data.tech),
			description: data.description,
			companyName: data.companyName,
			email: data.email,
			applyUrl: data.applyUrl,
			status: "pending",
			logoUrl: data.applyUrl,
			date: new Date(),
		});

		return job.save();
	}
	parseJobs(jobs) {
		let months=["01",'02','03','04','05',"06",'07','08','09','10','11','12']
		let today = Date.now();
		let todayDt= new Date(today);
		todayDt.setHours(0, 0, 0, 0);
		
		let jb = jobs.map(function (data) {
			let dt = new Date(data.date);
			dt.setHours(0, 0, 0, 0);
			let dateValue;

			if (todayDt.getTime() == dt.getTime()) {
				dateValue = "Today";
			} else {
				let day= dt.getDate()<10?'0'+ dt.getDate(): dt.getDate();
				dateValue = months[dt.getMonth()] + '/' + day;

			}
			return {
				id: data._id,
				jobTitle: data.jobTitle,
				tech: data.tech,
				description: data.description,
				companyName: data.companyName,
				email: data.email,
				applyUrl: data.applyUrl,
				logoUrl: data.logoUrl,
				date: dateValue
			}
		});
		return jb;
	}
	saveDev(data) {
		let developer = new Dev({
			name: data.name,
			email: data.email,
			tech: JSON.parse(data.tech),
			workType: data.workType,
			projects: data.projects,
			date: new Date(),
		});

		return developer.save();
	}

	saveProject(data) {
		let project = new Project({
			name: data.name,
			email: data.email,
			tech: JSON.parse(data.tech),
			tagLine: data.tagLine,
			budget: data.budget,
			description: data.description,
			date: new Date()
		});

		return project.save();
	}

	existingEmail(email, cb) {
		Dev.findOne({ email: email }, function (err, users) {
			console.log(users);
			if (users == null) {
				cb(false);
			} else {
				cb(true);
			}
		});
	}
}

module.exports = Service;