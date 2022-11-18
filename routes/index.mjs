import express from 'express';

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  idpLogout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};

router.use(auth(config));

router.use(async (req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();

  if (res.locals.isAuthenticated) {
    res.locals.userInfo = await req.oidc.fetchUserInfo();
  }

  console.clear();
  console.log(res.locals);

  next();
});

router.get('/', (req, res, next) => {
  res.status(200).render('index');
});

export default router;
