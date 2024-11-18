// const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");

// async function authMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authorization invalid"})
//     }

//     const token = authHeader.split(" ")[1];
//     // console.log(authHeader)
//     // console.log(token)
//     try {
//         const {username, userid} = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = {username, userid};
//         next();
//     } catch (error) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({msg: "Authorization invalid"});
//     }

// }

// module.exports = authMiddleware;

// const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");

// async function authMiddleware(req, res, next) {
//     const authHeader = req.headers.authorization;

//     // Check if the Authorization header is present and properly formatted
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authorization wrong" });
//     }

//     // Extract the token
//     const token = authHeader.split(" ")[1];

//     // Debugging logs to confirm header and token values
//     console.log("Authorization Header:", authHeader);
//     console.log("Token:", token);

//     try {
//         // Attempt to verify the token
//         const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user information to the request object
//         req.user = { username, userid };

//         // Proceed to the next middleware function
//         next();
//     } catch (error) {
//         // Log any verification errors and respond with 401 Unauthorized
//         console.error("JWT Verification Error:", error.message);
//         return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authorization invalid" });
//     }
// }

// module.exports = authMiddleware;

// const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");
// async function authMiddleware(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Authentication wrong" });
//   }
//   const token = authHeader.split(" ")[1];
//   // console.log(authHeader);
//   // console.log("to",token);
//   try {
//     const { username, userid, firstname } = jwt.verify(
//       token,"secret"
//     );
//     req.user = {
//       username,
//       userid,
//       firstname,
//     };
//     next();
//   } catch (error) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "Authentication invalid" });
//   }
// }

// module.exports = authMiddleware;

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Debug: Log the received headers to check if Authorization is present
    console.log("Received Headers:", req.headers);

    // Check if the Authorization header is present and formatted correctly
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authorization header missing or improperly formatted.");
    return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Authentication invalid" });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);

    try {
    // Verify the token
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret"; // Use environment variable or fallback
    const { username, userid, firstname } = jwt.verify(token, jwtSecret);

    // Attach user information to the request object for future middleware
    req.user = {
        username,
        userid,
        firstname,
    };
    next(); // Call next middleware or route handler
    } catch (error) {
    console.error("JWT Verification Error:", error.message); // Log the specific error
    return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Authentication invalid" });
    }
    }

    module.exports = authMiddleware;
