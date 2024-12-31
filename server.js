const http = require("http");
const fs = require("fs");
const path = require("path");

// Helper to send response
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Start server
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Serve HTML file
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (req.method === "GET" && req.url === "/style.css") {
    // Serve CSS file
    fs.readFile(path.join(__dirname, "style.css"), (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else if (req.method === "POST" && req.url === "/submit") {
    // Handle form submission
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = JSON.parse(body);
      const filePath = path.join(__dirname, "data.json");

      fs.readFile(filePath, (err, data) => {
        if (err && err.code !== "ENOENT") {
          sendResponse(res, 500, { message: "Server Error" });
          return;
        }

        const users = data ? JSON.parse(data) : [];
        const isDuplicate = users.some((user) => user.email === formData.email);

        if (isDuplicate) {
          sendResponse(res, 400, {
            message: "You have already filled the form. Duplicate submission is not allowed.",
          });
        } else {
          users.push(formData);

          fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
              sendResponse(res, 500, { message: "Server Error" });
            } else {
              sendResponse(res, 200, { message: "Registration successful!" });
            }
          });
        }
      });
    });
  } else {
    // Handle unknown routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Server listens on port 3000
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});