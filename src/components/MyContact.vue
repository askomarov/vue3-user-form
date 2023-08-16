<script setup lang="ts">
interface Link {
  title?: string;
  href: string;
  icon: string;
  iconWidth?: number;
  iconHeight?: number;
  description?: string;
}
const links: Link[] = [
  {
    title: "linkedin",
    href: "https://www.linkedin.com/in/askomarov/",
    icon: "linkedin",
    description: "linkedin",
  },
  {
    title: "upwork",
    href: "https://www.upwork.com/freelancers/~018bdbfb35f7a23234",
    icon: "upwork",
    iconWidth: 70,
    iconHeight: 24,
    description: "upwork",
  },
  {
    title: "github",
    href: "https://github.com/askomarov",
    icon: "github",
    description: "github",
  },
];
</script>
<template>
  <div>
    <h2 class="main-title">My 👨🏻‍💻Contacts</h2>
    <ul>
      <li v-for="(link, i) in links" :key="i">
        <a
          :href="link.href"
          class="main-link outline secondary"
          :class="link.title"
          :aria-label="`link to ${link.description}`"
        >
          <v-icon
            v-if="link.title != 'upwork'"
            :icon="`mdi-${link.icon}`"
          ></v-icon>

          <span>
            {{ link.title }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: 768px;
  margin-inline: auto;
  margin-block: 0;
  gap: 1rem;
}

.main-link {
  text-transform: uppercase;
  border-radius: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  color: #fff;
  text-decoration: none;

  &.linkedin {
    background-color: #0a66c2;
  }

  &.upwork {
    background-color: #14a800;
  }

  &.github {
    background-color: #24292f;
  }
}
</style>
