let totalCount = document.getElementById('total');
let issueCards = document.getElementById('all-issues');
let statusIcon = "";
let statusBorder = "";
let currentStatus = "all";
let allIssuesData = [];

const allFilterBtn = document.getElementById('tab-all');
const openFilterBtn = document.getElementById('tab-open');
const closeFilterBtn = document.getElementById('tab-close');
const searchInput =document.getElementById('search');
const model = document.getElementById("issueModel");
const modelTitle = document.getElementById("modelTitle");
const modelDescription = document.getElementById("modelDescription");
const modelAuthor = document.getElementById("modelAuthor");
const modelPriority = document.getElementById("modelPriority");
const closeModel = document.getElementById("closeModel");
const modelAssignee = document.getElementById("modelAssignee");

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
    // currentStatus = id;
    if(id === "tab-all"){
         currentStatus = "all"
    }
     else if(id === "tab-open"){
         currentStatus = "open"
    }
     else{
         currentStatus = "closed"
    }

    selected.classList.remove('bg-[#FFFFFF]', 'text-gray-500');
    selected.classList.add('bg-[#4A00FF]', 'text-white');
    open();
}

const open = () => {
    const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(allUrl)
        .then((res) => res.json())
        .then((data) => {
            allIssuesData =data.data;

            displayIssues(allIssuesData);
        })
};

const displayIssues = (issues) => {

    // 1.get the container
    const allIssues = document.getElementById('all-issues');
    allIssues.innerHTML="";
    issues.forEach((issue) => {

        if(currentStatus !== "all" && issue.status !== currentStatus){
         return;
    }

    if(issue.status === "open"){
        statusIcon = "../assets/Open-Status.png";
        statusBorder = "border-t-green-600";
    }
    else{
        statusIcon = "../assets/close.png";
        statusBorder = "border-t-blue-600";
    }
        // 2.create Element
        const issueCard = document.createElement('div');
        let borderColor = "border-t-green-700";
        let priority = issue.priority;
        const modelLabels = document.getElementById('modelLabels');
     issueCard.addEventListener("click", () => {

    modelTitle.innerText = issue.title;
    modelDescription.innerText = issue.description;
    modelAuthor.innerText = issue.author;
    modelPriority.innerText = issue.priority;
    modelAssignee.innerText = issue.author;

    modelLabels.innerHTML = "";

    issue.labels.forEach(label => {
 const labelBtn = document.createElement("span");

    labelBtn.className = "px-4 py-1.5 rounded-full border border-black-500 text-sm font-medium bg-gray-100 text-gray-700";

    labelBtn.innerText = label.toUpperCase();
    
        modelLabels.appendChild(labelBtn);

    });

     model.classList.remove("hidden");
     model.classList.add("flex");

});


        issueCard.className = `p-4 bg-[#FFFFFF] rounded-xl shadow border border-gray-200 border-t-8 ${statusBorder} flex flex-col h-full`;
        issueCard.innerHTML = `
        <div class="flex flex-col h-full">
                <div class="flex justify-between items-center mb-4">
                    <img src="${statusIcon}" alt="">
                    <button class="bg-[#FEECEC] rounded-[100px] px-[29px] py-1.5 text-[#EF4444] font-medium text-xl uppercase">${priority}</button>
                </div>
                <div class= "flex-grow">
                    <div>
                        <h3 class="font-semibold text-2xl mb-2.5">${issue.title}</h3>
                        <p class="text-[#64748B] text-xl mb-3">${issue.description}</p>
                    </div>
                </div>    
                    <div id="labels-${issue.id}" class="flex gap-2 items-center mb-2 uppercase">
                        
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
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-red-100 text-red-500 border border-red-200 text-xl font-medium uppercase";
                labelBtn.innerHTML = `
        <img class="inline w-4" src="../assets/BugDroid.png">
        BUG
        `;
            }
            else if(label === "help wanted"){
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-yellow-100 text-yellow-600 border border-yellow-200 text-xl font-medium uppercase";
                labelBtn.innerHTML = `
        <div class= "flex justify-center items-center"> 
            <img class=" w-3 mr-0.5" src="../assets/Lifebuoy.png">
        <p class = "text-[16px]">HELP WANTED</p>
        </div>
        `;
            }
            else{
                labelBtn.className = "rounded-[100px] px-4 py-2 bg-green-100 text-green-600 border border-green-200 text- font-medium uppercase";
                labelBtn.innerText = label;
            }

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

allFilterBtn.addEventListener("click", () => {
    toggleStyle("tab-all");
})

 openFilterBtn.addEventListener("click", () => {
    toggleStyle("tab-open");
})

 closeFilterBtn.addEventListener("click", () => {
    toggleStyle("tab-close");
})

searchInput.addEventListener("input", () => {
 const searchText = searchInput.value.toLowerCase();

const filteredIssues = allIssuesData.filter(issue =>        
        issue.title.toLowerCase().includes(searchText)     );
   displayIssues(filteredIssues);

});

closeModel.addEventListener("click", () => {
  model.classList.add("hidden");
});