const { exec } = require('child_process');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.post('/execute', async (ctx) => {
  const command = ctx.request.body.command;

  try {
    const { stdout, stderr } = await executeCommand(command);
    const output = {
      stdout: stdout.trim(),
      stderr: stderr.trim()
    };
    ctx.body = output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    ctx.status = 500;
    ctx.body = { error: 'Command execution failed' };
  }
});

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
