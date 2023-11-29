<template>
  <b-card class="gallerie">
    <!-- swiper1 -->
    <swiper-container ref="swiperTop" class="swiper-gallery gallery-top mySwiper" v-bind="swiperOptions"
      thumbs-swiper=".mySwiper2">

      <swiper-slide v-for="(data, index) in swiperData" :key="index">
        <b-img :src="data.img" fluid heigth="350px" class="imagen-gallerie"
          :style="{ objetFit: coverImg ? 'cover !important' : 'contain !important' }" />
      </swiper-slide>

    </swiper-container>

    <!-- swiper2 Thumbs -->
    <swiper-container ref="swiperThumbs" class="mySwiper2" init="false">
      <swiper-slide v-for="(data, index) in swiperData" :key="index">
        <b-img :src="data.img" fluid class="imagen-thumb" />
      </swiper-slide>
    </swiper-container>

    <b-button variant="dark" @click="() => showGallerie = !showGallerie" size="sm" class="btn-gallerie" rounded>
      <font-awesome-icon icon="fa-images" class="mr-1" />
      {{ $t('Todas las fotos') }} {{ imagenes.length }}
    </b-button>

    <gallerie :galleries="imagenes" :showGallerie.sync="showGallerie" :path="path" />
  </b-card>
</template>

<script>

import {
  BCard,
  BImg,
  BButton
} from 'bootstrap-vue';

import { Navigation, Pagination, FreeMode, Thumbs } from 'swiper'

import { ref, toRefs, computed, onMounted } from 'vue'

export default {

  components: {
    BCard,
    BImg,
    Gallerie: () => import('components/Gallerie.vue'),
    BButton

  },

  props: {
    imagenes: {
      type: Array,
      default: []
    },
    path: {
      type: String,
      default: '/storage/atracciones/imagenes/'
    },
    heightGallery: {
      type: String | Number,
      default: '400px',
    },
    coverImg: {
      type: Boolean,
      default: false
    }
  },


  setup(props) {

    const swiperTop = ref(null)
    const swiperThumbs = ref(null)
    const { imagenes, path, heightGallery, coverImg } = toRefs(props)
    const showGallerie = ref(false)
    const swiperOptions = ref({
      loop: true,
      navigation: true,
      // autoplay:{
      //    delay:5000
      // },
      'looped-slides': 5,
      'space-between': 10,
      modules: [Navigation, Pagination],
    });

    const swiperOptionThumbs = ref({
      'space-between': 0,
      'slides-per-view': 4,
      'free-mode': true,
      'watch-slides-progress': true,
      modules: [FreeMode, Navigation, Thumbs],
      breakpoints: {
        320: {
          slidesPerView: 2,

        },
        450: {
          slidesPerView: 3,

        },
        550: {
          slidesPerView: 4,

        },

        640: {
          slidesPerView: 6,
        },
        
        1024: {
          slidesPerView: 8,
        }
      }

    });


    const swiperData = computed(() => {
      return imagenes.value.map(val => ({ img: `${path.value}${val.imagen}` }))
    })


    onMounted(() => {
      if (swiperThumbs.value) {
        Object.assign(swiperThumbs.value, swiperOptionThumbs.value)
        swiperThumbs.value.initialize();
      }
    })

    const heightContainer = computed(() => {


      if (typeof heightGallery.value == 'number') {
        return `${heightGallery.value}px`;
      }

      return heightGallery.value;

    })

    return {
      swiperThumbs,
      swiperTop,
      swiperData,
      swiperOptions,
      showGallerie,
      heightContainer,
      coverImagen: computed(() => coverImg.value)
    }

  }
}
</script>

<style lang="scss" scoped>
$height_container: v-bind(heightContainer);
$coverImg: v-bind(coverImagen);

.swiper-slide {
  display: flex;
  justify-content: center;

  .imagen-gallerie {
    height: 350px;
    width: 100%;
    object-fit: cover;
    margin: auto 0px;
  }
}

.imagen-thumb {
  cursor: pointer;
  height: 60px;
  width: 120px;
  object-fit: cover;
}

.gallerie {
  //   flex: 1 1 60%;
  position: relative;

  // .swiper-slide-active{
  .btn-gallerie {
    position: absolute;
    left: 2rem;
    top: 3rem;
    bottom: auto;
    right: auto;
    z-index: 10;
  }

  // }

}

swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide {
  text-align: center;
  font-size: 18px;
  // background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  // object-fit: cover;
}

swiper-container {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper {
  max-height: $height_container;
  width: 100%;
}

.mySwiper2 {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper2 swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
  justify-content: flex-start;
}

.mySwiper2 .swiper-slide-thumb-active {
  opacity: 1;
}

swiper-slide img {
  display: block;
  width: auto;
  height: 100%;
}
</style>
