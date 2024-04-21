<script setup>
import { ref } from "vue";

const itemMenu = ref([
  {
    icon: "pi pi-home",
    title: "Classroom",
    open: false,
    item: [
      {
        icon: "pi pi-book",
        subItem: "My Classroom",
      },
      {
        icon: "pi pi-users",
        subItem: "Joined Classroom",
      },
    ],
  },
  {
    icon: "pi pi-cog",
    title: "Settings",
    open: false,
    item: [
      {
        icon: "pi pi-user",
        subItem: "Profile",
      },
      {
        icon: "pi pi-sign-out",
        subItem: "Log out",
      },
    ],
  },
]);

const toggleSubMenu = (menu) => {
  menu.open = !menu.open;
};
</script>

<template>
  <div
    class="card"
    style="
      border-width: 0 1px 0 0;
      border-style: solid;
      border-color: var(--surface-border);
      width: 20%;
    "
  >
    <div class="flex flex-column h-full">
      <div v-for="menu in itemMenu" :key="menu.title">
        <ul class="list-none p-1 m-0">
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
                >
                  <i :class="subMenu.icon + ' mr-2'"></i>
                  <span class="font-medium">{{ subMenu.subItem }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
