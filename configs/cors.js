import cors from "cors";

const onCors = (app) => {
  const corsOpts = {
    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],

    allowedHeaders: ["Content-Type"],
  };

  app.use(cors(corsOpts));
};

export default onCors;
