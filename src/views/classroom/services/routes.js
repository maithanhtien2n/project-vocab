export default [
  {
    path: 'classroom?type=myClassRoom',
    name: 'MyClassroom',
    component: () => import('../myClassroom.vue')
  },
  {
    path: 'classroom/:classRoomId',
    name: 'Vocabulary',
    component: () => import('../vocabulary.vue')
  },
  {
    path: 'classroom/listening',
    name: 'Listening',
    component: () => import('../Listening.vue')
  }
]
