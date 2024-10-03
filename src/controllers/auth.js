import * as authServices from "../services/auth.js";

const setupSession = (res, session) => {
      res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};

export const registerController = async (req, res) => {
    try {
        const newUser = await authServices.register(req.body);
        res.status(201).json({
            status: 201,
            message: "Successfully registered user",
            data: newUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message || "Error registering user",
        });
    }
};

    export const loginController = async (req, res) => {
        const session = await authServices.login(req.body);

        setupSession(res, session);

        res.json({
            status: 200,
            message: "Successfully signin",
            data: {
                accessToken: session.accessToken,
            }
        });

};

export const refreshController = async (req, res) => {
    const { refreshToken, sessionId } = req.cookies;
    const session = await authServices.refreshSession({ refreshToken, sessionId });

    setupSession(res, session);
    
     res.json({
        status: 200,
        message: "Successfully refresh session",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const logoutController = async (req, res) => {
    const { sessionId } = req.cookies;
    if (sessionId) {
        await authServices.logout(sessionId);
    }

    res.clearCookie("sessionId", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    res.status(204).send();
};
