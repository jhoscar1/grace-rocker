const gatekeeper = {};

const needAuthError = new Error('Must be logged in to perform this action');
needAuthError.status = 401;

const forbiddenError = new Error('You are forbidden from performing this action');
forbiddenError.status = 403;

gatekeeper.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        next(needAuthError);
    }
}

gatekeeper.isAdmin = (req, res, next) => {
    if (!req.user) {
        next(needAuthError);
    }
    else if (req.user.isAdmin){
        next();
    }
    else {
        next(forbiddenError);
    }
}

gatekeeper.isAdminOrSelf = (req, res, next) => {
    if (!req.user) {
        next(needAuthError);
    }
    else if (req.user.id === req.params.userId || req.user.isAdmin){
        next();
    }
    else {
        next(forbiddenError);
    }
}

gatekeeper.isAdminOrHasOrder = (req, res, next) => {
    if (!req.user) {
        next(needAuthError);
    }
    // req.order is coming from req.params on the order router
    else if (req.order.userId !== req.user.id && !req.user.isAdmin) {
        next(forbiddenError);
    }
    else {
        next();
    }
}

module.exports = gatekeeper;