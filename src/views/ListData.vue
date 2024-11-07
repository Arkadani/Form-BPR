<template>
  <div class="flex justify-center min-h-screen bg-gray-200">
    <div class="container my-5 p-5 bg-white border border-gray-300 rounded-xl w-full max-w-screen-lg shadow-lg">
      
      <div class="text-center bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-black py-8 rounded-t-xl">
        <h1 class="text-5xl font-extrabold uppercase tracking-wider">BPR Cahaya Fajar</h1>
      </div>

      <div class="mt-5 flex justify-end">
        <button @click="showAddForm = !showAddForm" class="bg-gray-400 text-white py-2 px-6 rounded shadow-md hover:bg-gray-500 transition duration-300">
          {{ showAddForm ? 'Cancel' : 'Add New Data' }}
        </button>
      </div>

      <div v-if="showAddForm" class="mt-8 bg-gray-50 p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-6">Add New Data</h2>
        <form @submit.prevent="addData" class="space-y-4">
          <div class="flex flex-col">
            <label for="name" class="text-lg font-medium mb-2">Name</label>
            <input type="text" id="name" v-model="newData.formPemohon.namaKtp" class="border border-gray-300 rounded-lg w-full p-3 focus:ring-2 focus:ring-gray-400 focus:outline-none transition duration-300" required />
          </div>
          <div class="flex justify-center">
            <button type="submit" class="mt-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-xl shadow-md transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div class="mt-10">
        <h2 class="text-2xl font-semibold mb-5 text-center">Available Data</h2>

        <table class="table-auto w-full border-collapse text-left">
          <thead>
            <tr class="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700">
              <th class="border border-gray-300 px-4 py-2">ID</th>
              <th class="border border-gray-300 px-4 py-2">Name</th>
              <th class="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in dataArray" :key="index" class="hover:bg-gray-100 transition duration-200">
              <td class="border border-gray-300 px-4 py-2">{{ data.id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ data.formPemohon.namaKtp }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <div class="flex space-x-4"> 
                  <button @click="deleteData(data.id)" class="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-400 transition duration-300">
                    Delete
                  </button>
                  <button @click="goToMainPage(data.id)" class="bg-gray-500 text-white py-2 px-4 rounded shadow-md hover:bg-gray-400 transition duration-300">
                    View Details
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="dataArray.length === 0">
              <td colspan="4" class="text-center border border-gray-300 px-4 py-2 text-gray-600">No Data Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const dataArray = ref([]);
const router = useRouter();
const showAddForm = ref(false);

const newData = ref({
  formPemohon: {
    namaKtp: ''
  }
});

const loadData = () => {
  try {
    const storedData = localStorage.getItem('dataArray');
    dataArray.value = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error loading data:", error);
    dataArloadData
    loadData
  }
};

const generateId = () => {
  return Date.now().toString();
};

const addData = () => {
  if (newData.value.formPemohon.namaKtp) {
    const generatedId = generateId();

    const newEntry = {
      id: generatedId,
      formPemohon: { ...newData.value.formPemohon }
    };
   
    dataArray.value.push(newEntry);
    localStorage.setItem('dataArray', JSON.stringify(dataArray.value));
    
    localStorage.setItem('selectedId', generatedId);

    router.push({ path: '/main', query: { id: generatedId } });
    
    newData.value.formPemohon.namaKtp = '';
    showAddForm.value = false;
  }
};

const goToMainPage = (id) => {
  localStorage.setItem('selectedId', id);
  router.push({ path: '/main', query: { id } });
};

const deleteData = (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this data?");
  if (confirmDelete) {
    dataArray.value = dataArray.value.filter((data) => data.id !== id);
    localStorage.setItem('dataArray', JSON.stringify(dataArray.value));
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.table-auto th, .table-auto td {
  padding: 12px;
}

.table-auto th {
  background-color: #e2e8f0;
}

.table-auto td {
  font-size: 1rem;
}

.hover:bg-gray-100:hover {
  background-color: #f7fafc;
}
</style>
