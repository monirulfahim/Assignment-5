// let totalCount = document.getElementById('total')
// let interviewCount = document.getElementById('interview')
// let rejectedCount = document.getElementById('rejected')

const allFilterBtn = document.getElementById('tab-all')
const openFilterBtn = document.getElementById('tab-open')
const closeFilterBtn = document.getElementById('tab-close')

function toggleStyle(id){

    // adding base bg for all
    allFilterBtn.classList.add('bg-[#FFFFFF]', 'text-gray-500')
    openFilterBtn.classList.add('bg-[#FFFFFF]', 'text-gray-500')
    closeFilterBtn.classList.add('bg-[#FFFFFF]', 'text-gray-500')

    // if any button has black then remove
    allFilterBtn.classList.remove('bg-[#4A00FF]', 'text-white')
    openFilterBtn.classList.remove('bg-[#4A00FF]', 'text-white')
    closeFilterBtn.classList.remove('bg-[#4A00FF]', 'text-white')

    const selected = document.getElementById(id);
    currentStatus = id

    // adding black for selected button
    selected.classList.remove('bg-[#FFFFFF]', 'text-gray-500');
    selected.classList.add('bg-[#4A00FF]', 'text-white');
}