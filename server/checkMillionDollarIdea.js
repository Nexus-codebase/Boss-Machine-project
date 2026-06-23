const checkMillionDollarIdea = (req, res, next) => {
	const numWeeks = Number(req.body.numWeeks);
	const weeklyRevenue = Number(req.body.weeklyRevenue);

	if (!Number.isFinite(numWeeks) || !Number.isFinite(weeklyRevenue)) {
		return res.sendStatus(400);
	}

	if (numWeeks * weeklyRevenue < 1000000) {
		return res.sendStatus(400);
	}

	return next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
