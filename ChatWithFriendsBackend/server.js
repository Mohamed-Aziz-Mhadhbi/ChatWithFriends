const express = require("express");
const mpongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

require("./Config/Connect");

const userRoute = require("./Routes/User");
const suiviRoute = require("./Routes/suivi");
const questionRoute = require("./Routes/question");
const imageRoute = require("./Routes/image");
const PublicationRoute = require("./Routes/Publication");
const PublicationRoute2 = require("./Routes/Publication2");
const ChatRoute = require("./Routes/chat");
const CommentRoute = require("./Routes/comment");
const chat2 = require("./Routes/chat2");
const EventRoutrt = require("./Routes/event");



//http:127.0.0.1:3000/user/
app.use("/chat2", chat2);
app.use("/event", EventRoutrt);
app.use("/comment", CommentRoute);
app.use("/chats", ChatRoute);
app.use("/Publication2", PublicationRoute2);
app.use("/user", userRoute);
app.use("/suivi", suiviRoute);
app.use("/question", questionRoute);
app.use("/image", imageRoute);
app.use("/Publication", PublicationRoute);
app.use("/getimg", express.static("./uploads"));

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
