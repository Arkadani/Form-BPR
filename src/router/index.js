import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ListData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  HomeView,
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainPage.vue'),
      props: route => ({ id: route.query.id }),
      redirect: '/main/permohonan',
      children: [
        {
          path: 'permohonan',
          name: 'permohonan',
          component: () => import('../views/PermohonanPembiayaan.vue')
        },
        {
          path: 'datapemohon',
          name: 'datapemohon',
          component: () => import('../views/DataPemohon.vue')
        },
        {
          path: 'datapekerjaan',
          name: 'datapekerjaan',
          component: () => import('../views/DataPekerjaan.vue')
        },
        {
          path: 'datasuamiistri',
          name: 'datasuamiistri',
          component: () => import('../views/DataSuamiistri.vue')
        },
        {
          path: 'datapenjaminan',
          name: 'datapenjaminan',
          component: () => import('../views/DataPenjaminan.vue')
        },
        {
          path: 'jaminankendaraan',
          name: 'jaminankendaraan',
          component: () => import('../views/JaminanKendaraan.vue')
        },
        {
          path: 'jaminantanah',
          name: 'jaminantanah',
          component: () => import('../views/JaminanTanah.vue')
        },
        {
          path: 'jaminanbilyet',
          name: 'jaminanbilyet',
          component: () => import('../views/JaminanBilyet.vue')
        },
        {
          path: 'informasipemohon',
          name: 'informasipemohon',
          component: () => import('../views/InformasiPemohon.vue')
        },
        {
          path: 'datareferensi',
          name: 'datareferensi',
          component: () => import('../views/DataReferensi.vue')
        },
        {
          path: 'denahalamat',
          name: 'denahalamat',
          component: () => import('../views/DenahAlamat.vue')
        },
        {
          path: 'result',
          name: 'result',
          component: () => import('../views/ResultData.vue')
        }
      ]
    },
  ]
})

export default router
