const jwt = require("jsonwebtoken");

// Function to generate an invitation token
function generateInvitationToken(collaboratorEmail, todoListId) {
  const secretKey = "your-secret-key"; // Replace this with your secret key for signing the token
  const tokenData = {
    type: "invitation",
    email: collaboratorEmail,
    todoListId: todoListId,
    
  };

  // Generate the token with a specific expiration time (optional)
  const tokenOptions = {
    expiresIn: "1h",
  };

  const token = jwt.sign(tokenData, secretKey, tokenOptions);
  return token;
}

// Function to verify and decode the invitation token
function verifyInvitationToken(token) {
  const secretKey = "your-secret-key";

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, secretKey);

    // Check if the token type is "invitation"
    if (decodedToken.type !== "invitation") {
      throw new Error("Invalid token type");
    }

    // Extract and return collaborator's email and todo list ID from the token
    const collaboratorEmail = decodedToken.email;
    const todoListId = decodedToken.todoListId;

    return { collaboratorEmail, todoListId };
  } catch (error) {
    // If the token is invalid, expired, or the signature is not valid
    console.error("Invalid token:", error.message);
    throw new Error("Invalid token");
  }
}

module.exports={generateInvitationToken,verifyInvitationToken}