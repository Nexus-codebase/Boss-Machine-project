const express = require('express');
const apiRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
	createMeeting,
	getAllFromDatabase,
	getFromDatabaseById,
	addToDatabase,
	updateInstanceInDatabase,
	deleteFromDatabasebyId,
	deleteAllFromDatabase,
} = require('./db');

const isValidId = (id) => /^\d+$/.test(id);

const createGetAllHandler = (model) => (req, res) => {
	const instances = getAllFromDatabase(model);
	return res.status(200).send(instances);
};

const createPostHandler = (model) => (req, res) => {
	try {
		const newInstance = addToDatabase(model, req.body);
		if (!newInstance) {
			return res.sendStatus(400);
		}
		return res.status(201).send(newInstance);
	} catch (error) {
		return res.sendStatus(400);
	}
};

const validateModelIdParam = (model, paramName) => (req, res, next) => {
	const id = req.params[paramName];
	if (!isValidId(id)) {
		return res.sendStatus(404);
	}

	const instance = getFromDatabaseById(model, id);
	if (!instance) {
		return res.sendStatus(404);
	}

	req[paramName] = instance;
	return next();
};

const createGetByIdHandler = (paramName) => (req, res) => {
	return res.status(200).send(req[paramName]);
};

const createPutByIdHandler = (model, idParamName) => (req, res) => {
	try {
		req.body.id = req.params[idParamName];
		const updatedInstance = updateInstanceInDatabase(model, req.body);
		if (!updatedInstance) {
			return res.sendStatus(404);
		}
		return res.status(200).send(updatedInstance);
	} catch (error) {
		return res.sendStatus(400);
	}
};

const createDeleteByIdHandler = (model, idParamName) => (req, res) => {
	const isDeleted = deleteFromDatabasebyId(model, req.params[idParamName]);
	if (!isDeleted) {
		return res.sendStatus(404);
	}
	return res.sendStatus(204);
};

const validateWorkIdParam = (req, res, next) => {
	const { workId } = req.params;
	if (!isValidId(workId)) {
		return res.sendStatus(404);
	}

	const work = getFromDatabaseById('work', workId);
	if (!work) {
		return res.sendStatus(404);
	}

	req.work = work;
	return next();
};

// /api/minions routes
apiRouter.get('/minions', createGetAllHandler('minions'));
apiRouter.post('/minions', createPostHandler('minions'));
apiRouter.get('/minions/:minionId', validateModelIdParam('minions', 'minionId'), createGetByIdHandler('minionId'));
apiRouter.put('/minions/:minionId', validateModelIdParam('minions', 'minionId'), createPutByIdHandler('minions', 'minionId'));
apiRouter.delete('/minions/:minionId', validateModelIdParam('minions', 'minionId'), createDeleteByIdHandler('minions', 'minionId'));

// Bonus: /api/minions/:minionId/work routes
apiRouter.get('/minions/:minionId/work', validateModelIdParam('minions', 'minionId'), (req, res) => {
	const minionWork = getAllFromDatabase('work').filter((work) => work.minionId === req.params.minionId);
	return res.status(200).send(minionWork);
});

apiRouter.post('/minions/:minionId/work', validateModelIdParam('minions', 'minionId'), (req, res) => {
	try {
		const workToCreate = {
			...req.body,
			minionId: req.params.minionId,
		};
		const createdWork = addToDatabase('work', workToCreate);
		if (!createdWork) {
			return res.sendStatus(400);
		}
		return res.status(201).send(createdWork);
	} catch (error) {
		return res.sendStatus(400);
	}
});

apiRouter.put('/minions/:minionId/work/:workId', validateModelIdParam('minions', 'minionId'), validateWorkIdParam, (req, res) => {
	if (req.work.minionId !== req.params.minionId) {
		return res.sendStatus(400);
	}

	if (`${req.body.minionId}` !== req.params.minionId) {
		return res.sendStatus(400);
	}

	try {
		req.body.id = req.params.workId;
		const updatedWork = updateInstanceInDatabase('work', req.body);
		if (!updatedWork) {
			return res.sendStatus(404);
		}
		return res.status(200).send(updatedWork);
	} catch (error) {
		return res.sendStatus(400);
	}
});

apiRouter.delete('/minions/:minionId/work/:workId', validateModelIdParam('minions', 'minionId'), validateWorkIdParam, (req, res) => {
	if (req.work.minionId !== req.params.minionId) {
		return res.sendStatus(400);
	}

	const isDeleted = deleteFromDatabasebyId('work', req.params.workId);
	if (!isDeleted) {
		return res.sendStatus(404);
	}

	return res.sendStatus(204);
});

// /api/ideas routes
apiRouter.get('/ideas', createGetAllHandler('ideas'));
apiRouter.post('/ideas', checkMillionDollarIdea, createPostHandler('ideas'));
apiRouter.get('/ideas/:ideaId', validateModelIdParam('ideas', 'ideaId'), createGetByIdHandler('ideaId'));
apiRouter.put('/ideas/:ideaId', validateModelIdParam('ideas', 'ideaId'), checkMillionDollarIdea, createPutByIdHandler('ideas', 'ideaId'));
apiRouter.delete('/ideas/:ideaId', validateModelIdParam('ideas', 'ideaId'), createDeleteByIdHandler('ideas', 'ideaId'));

// /api/meetings routes
apiRouter.get('/meetings', createGetAllHandler('meetings'));
apiRouter.post('/meetings', (req, res) => {
	const meeting = createMeeting();
	const createdMeeting = addToDatabase('meetings', meeting);
	return res.status(201).send(createdMeeting);
});
apiRouter.delete('/meetings', (req, res) => {
	deleteAllFromDatabase('meetings');
	return res.sendStatus(204);
});


module.exports = apiRouter;
