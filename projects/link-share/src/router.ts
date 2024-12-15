import {} from "jsr:@std/http";

type Handler = (
  req: Request,
  match: URLPatternResult,
  info?: Deno.ServeHandlerInfo<Deno.Addr>,
) => Promise<Response>;

type Route = {
  pattern: URLPattern;
  handler: Handler;
};

type Method = "GET" | "POST" | "PUT" | "DELETE";

export class Router {
  #routes: Map<Method, Route[]>;

  constructor() {
    this.#routes = new Map();
  }

  get(path: string, handler: Handler) {
    this.#addRoute("GET", path, handler);
  }

  post(path: string, handler: Handler) {
    this.#addRoute("POST", path, handler);
  }

  put(path: string, handler: Handler) {
    this.#addRoute("PUT", path, handler);
  }

  delete(path: string, handler: Handler) {
    this.#addRoute("DELETE", path, handler);
  }

  handle(
    req: Request,
    info?: Deno.ServeHandlerInfo<Deno.Addr>,
  ): Promise<Response> {
    const routes = this.#routes.get(req.method as Method) ?? [];
    for (const route of routes) {
      const match = route.pattern.exec(req.url);
      if (match) {
        return route.handler(req, match, info);
      }
    }

    return Promise.resolve(new Response("Not found", { status: 404 }));
  }

  #addRoute(method: Method, path: string, handler: Handler) {
    const routes = this.#routes.get(method) ?? [];
    routes.push({
      pattern: new URLPattern({ pathname: path }),
      handler: async (req, info) => {
        try {
          return await handler(req, info);
        } catch (error) {
          console.error("Error handling request:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    });
    this.#routes.set(method, routes);
  }
}
