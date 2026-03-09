let totalCount = document.getElementById('total');
let issueCards = document.getElementById('all-issues');

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

const open = () => {
    const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(allUrl)
        .then((res) => res.json())
        .then((data) => {
            displayIssues(data.data);
        })
};

const displayIssues = (issues) => {

    
    // 1.get the container
    const allIssues = document.getElementById('all-issues');
    allIssues.innerHTML="";
    issues.forEach((issue) => {
        // 2.create Element
        const issueCard = document.createElement('div');
        let borderColor = "border-t-green-700";
        let priority = issue.priority;
    //     if(priority === "high"){
    //     borderColor = "border-t-red-700"
    // }
    // else if(priority === "medium"){
    //     borderColor = "border-t-yellow-500"
    // }
        issueCard.className = `p-4 bg-[#FFFFFF] rounded-xl shadow border border-gray-200 border-t-8 ${borderColor} flex flex-col h-full`;
        issueCard.innerHTML = `
        <div class="flex flex-col h-full">
                <div class="flex justify-between items-center mb-4">
                    <img src="../assets/Open-Status.png" alt="">
                    <button class="bg-[#FEECEC] rounded-[100px] px-[29px] py-1.5 text-[#EF4444] font-medium text-xl">${priority}</button>
                </div>
                <div class= "flex-grow">
                    <div>
                        <h3 class="font-semibold text-2xl mb-2.5">${issue.title}</h3>
                        <p class="text-[#64748B] text-xl mb-3">${issue.description}</p>
                    </div>
                </div>    
                    <div id="labels-${issue.id}" class="flex gap-2 items-center mb-2">
                        
                    </div>
            <hr class=" border-gray-300 mb-4">
                <div>
                    <p>#${issue.id} by ${issue.author}</p>
                    <br>
                    <p>${issue.createdAt.split("T")[0]}</p>
                </div>
            </div>
        `
        const labelContainer = issueCard.querySelector(`#labels-${issue.id}`);

        issue.labels.forEach(label => {

            const labelBtn = document.createElement("button");

            if(label === "bug"){
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-red-100 text-red-500 border border-red-200 text-xl font-medium";
            }
            else if(label === "help wanted"){
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-yellow-100 text-yellow-600 border border-yellow-200 text-xl font-medium";
            }
            else{
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-green-100 text-green-600 border border-green-200 text- font-medium";
            }

            labelBtn.innerText = label;

            labelContainer.appendChild(labelBtn);

        });
        // 3.add to container

        allIssues.appendChild(issueCard);
    });
    calculateCount()
}
open();

function calculateCount(){
    totalCount.innerText = issueCards.children.length;
}

