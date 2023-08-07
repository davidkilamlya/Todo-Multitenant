exports.checkAuth = async (req, res) => {
  if (req.user) {
    // User is authenticated, send a success response
    res.status(200).json({ authenticated: true });
  } else {
    // User is not authenticated
    res.status(401).json({ authenticated: false });
  
  }
};
