<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppTopBar from './AppTopBar.vue'
import { onDeleteAppLocalStorage } from '@/utils'

const router = useRouter()
const route = useRoute()

const zoomOutMenu = ref(true)

const itemMenu = ref([
  {
    icon: 'pi pi-home',
    title: 'Classroom',
    open: true,
    item: [
      {
        icon: 'pi pi-book',
        subItem: 'My Classroom',
        routeName: 'MyClassroom',
        params: null,
        query: { type: 'myClassRoom' }
      },
      {
        icon: 'pi pi-users',
        subItem: 'Joined Classroom',
        routeName: 'MyClassroom',
        query: { type: 'joinedClassroom' }
      }
    ]
  },
  {
    icon: 'pi pi-cog',
    title: 'Settings',
    open: false,
    item: [
      {
        icon: 'pi pi-user',
        subItem: 'Profile',
        routeName: 'Profile'
      },
      {
        icon: 'pi pi-sign-out',
        subItem: 'Log out',
        routeName: 'LogOut'
      }
    ]
  }
])

const onActive = (subItem) => {
  switch (subItem) {
    case 'My Classroom':
      return route.name === 'MyClassroom' && route.query.type === 'myClassRoom'
    case 'Joined Classroom':
      return route.name === 'MyClassroom' && route.query.type === 'joinedClassroom'
    case 'Profile':
      return route.name === 'Profile'
    default:
      break
  }
}

const toggleSubMenu = (menu) => {
  menu.open = !menu.open
}

const onClickMenuItem = ({ routeName, params, query }) => {
  if (routeName === 'LogOut') {
    onDeleteAppLocalStorage()
    return
  }

  let routerData = {}
  if (routeName) {
    routerData.name = routeName
  }
  if (params) {
    routerData.params = params
  }
  if (query) {
    routerData.query = query
  }
  router.push(routerData)
}
</script>

<template>
  <AppTopBar />

  <div class="flex">
    <div
      v-if="route.name !== 'Vocabulary'"
      class="card"
      style="
        border-width: 0 1px 0 0;
        border-style: solid;
        border-color: var(--surface-border);
        margin-top: 4rem;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 4;
      "
      :class="zoomOutMenu ? 'w-18rem' : 'w-4rem'"
    >
      <div class="flex flex-column h-full">
        <div v-for="menu in itemMenu" :key="menu.title">
          <ul v-if="zoomOutMenu" class="list-none p-1 m-0">
            <li>
              <a
                @click="toggleSubMenu(menu)"
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i :class="menu.icon + ' mr-2'"></i>
                <span class="font-medium">{{ menu.title }}</span>
                <i class="pi pi-chevron-down ml-auto"></i>
              </a>
              <ul
                v-if="menu.open"
                class="list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
              >
                <li v-for="subMenu in menu.item" :key="subMenu.subItem">
                  <a
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                    @click="onClickMenuItem(subMenu)"
                  >
                    <i
                      :class="[subMenu.icon + ' mr-2', { activeColor: onActive(subMenu.subItem) }]"
                    />
                    <span :class="['font-medium', { activeColor: onActive(subMenu.subItem) }]">
                      {{ subMenu.subItem }}
                    </span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul v-else class="list-none bg-red-200">
            <li>
              <a
                @click="toggleSubMenu(menu)"
                class="flex justify-content-center align-items-center cursor-pointer border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
              >
                <i :class="menu.icon" class="text-center"></i>
              </a>

              <!-- <ul
                v-if="menu.open"
                class="list-none py-0 pl-3 pr-0 m-0 overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
              >
                <li v-for="subMenu in menu.item" :key="subMenu.subItem">
                  <a
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
                    @click="onClickMenuItem(subMenu)"
                  >
                    <i
                      :class="[subMenu.icon + ' mr-2', { activeColor: onActive(subMenu.subItem) }]"
                    />
                  </a>
                </li>
              </ul> -->
            </li>
          </ul>
        </div>

        <div @click="zoomOutMenu = !zoomOutMenu">Zoom</div>
      </div>
    </div>

    <!-- <div
      v-if="route.name !== 'Vocabulary'"
      class="card"
      style="
        border-width: 0 1px 0 0;
        border-style: solid;
        border-color: var(--surface-border);
        width: 18rem;
        margin-top: 4rem;
      "
    /> -->

    <div :class="zoomOutMenu ? 'w-18rem' : 'w-4rem'"></div>

    <div style="margin-top: 3.5rem" class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.activeColor {
  color: #059669;
}
</style>
