const Koa = require("koa");
const Router = require("@koa/router");
const Sequelize = require("sequelize");
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "database.sqlite"
});

const Project = sequelize.define("project", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chain: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Asset = sequelize.define("asset", {
  contractAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Asset.belongsTo(Project);
Project.hasMany(Asset);

sequelize.sync().then(() => {
  console.log("Database synchronized");
}).catch((err) => {
  console.error("Error synchronizing database:", err);
});

router.get("/projects", async (ctx) => {
  const projects = await Project.findAll({
    include: [Asset]
  });
  ctx.body = projects;
});

router.get("/projects/:id", async (ctx) => {
  const project = await Project.findByPk(ctx.params.id, {
    include: [Asset]
  });
  if (!project) {
    ctx.status = 404;
    ctx.body = "Project not found";
  } else {
    ctx.body = project;
  }
});

router.post("/projects", async (ctx) => {
  const { name, chain } = ctx.request.body;
  const project = await Project.create({ name, chain });
  ctx.body = project;
});

router.post("/projects/:id/assets", async (ctx) => {
  const projectId = ctx.params.id;
  const { chain, contractAddress } = ctx.request.body;
  const asset = await Asset.create({ chain, contractAddress, projectId });
  ctx.body = asset;
});

router.post("/projects-with-assets", async (ctx) => {
  const { name, chain, assets } = ctx.request.body;

  try {
    const project = await Project.create({ name, chain });

    const createdAssets = await Promise.all(
      assets.map(async (asset) => {
        const { chain, contractAddress } = asset;
        return await Asset.create({ chain, contractAddress, projectId: project.id });
      })
    );

    project.assets = createdAssets;

    ctx.body = project;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Failed to create project with assets';
  }
});

router.get("/test", async (ctx) => {
  ctx.body = "Server is live!";
});

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser());
app.use(router.routes());

const port = process.env.PORT || 3003; // Use the provided PORT environment variable for production, or fallback to 3000 for development

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
