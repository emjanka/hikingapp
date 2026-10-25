import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/explore.jsx"),
  route("trails", "routes/trails.jsx"),
  route("blog", "routes/blog.jsx"),
  route("blog/category/:category", "routes/blogCategory.jsx"),
  route("blog/:id", "routes/blogDetail.jsx"),
  route("profile", "routes/profile.jsx"),
] satisfies RouteConfig;