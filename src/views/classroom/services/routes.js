export default [
  {
    path: "classroom",
    name: "MyClassroom",
    component: () => import("../myClassroom.vue"),
  },
  {
    path: "classroom/:id",
    name: "Vocabulary",
    component: () => import("../vocabulary.vue"),
  },
  {
    path: "classroom/Listening/:id",
    name: "Listening",
    component: () => import("../Listening.vue"),
  },
];
