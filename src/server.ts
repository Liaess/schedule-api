import { App } from "@/config";

const port = process.env.PORT || 4000;

export const app = new App();

app.init().then(() => {
  app.server.listen(port, () => {
    //eslint-disable-next-line no-console
    console.log(`Server started on port ${port}`);
  });
});
