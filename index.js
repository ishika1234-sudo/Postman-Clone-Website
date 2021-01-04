console.log('INDEX.JS');
//initialise no. of parameters
let addParamCount = 0;

//utility functions
//1. to get DOM element from string
function getDomElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



//hiding the parameter box initially as the default content type is JSON
let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

//if user clicks on params box hide the json box
paramsRadio = document.getElementById('custom');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parameterBox').style.display = 'block';
})


//if user clicks on json box hide the params box
jsonRadio = document.getElementById('json');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})

//if user clicks on add button then more custom params should get added
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `
    <div id="parameterBox my-2">
            <div class="row">
                <label for="url" class="col-sm-2 col-form-label">parameter ${addParamCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="enter parameter ${addParamCount + 2} key" id="paramKey${addParamCount + 2}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder=" enter parameter ${addParamCount + 2} value" id=paramValue${addParamCount + 2}>
                </div>
            </div>
            <button class="btn btn-primary deleteParam" type="button">-</button>

        </div>
    `;
    //converting the element string to DOM elemnt node
    let paramElement = getDomElementFromString(string);
    console.log(paramElement);
    params.appendChild(paramElement);


    // add eventlistener to delete the custom params using - buttons
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) { // for of loop
        item.addEventListener('click', (e) => {
            // alert('do you want to delete?');
            e.target.parentElement.remove(); //e.target is the button been targeted n parent elm is the div to remove
        })
    }
    //console.log('PARAMS', params);
    //console.log('DELEET PARAMS', deleteParam);
    addParamCount++;
})

//on hitting the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseJsonText').value = 'please wait, fetching the response...';

    //fetch values entered by user
    let url = document.getElementById('url').value;

    //to select between GET or POST
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    //console.log(requestType);

    //to select between JSON or custom
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    console.log(contentType);

    //collecting user values in an obj if he chooses custom params
    console.log('cONTENT TYPE', contentType);
    if (contentType == 'custom') {
        data = {};
        for (i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('paramKey' + (i + 1)) != undefined) {
                //console.log('INSIDE IF CONDITION', data);
                let key = document.getElementById('paramKey' + (i + 1)).value;
                let val = document.getElementById('paramValue' + (i + 1)).value;
                data[key] = val;

            }
            console.log('DATA1', data);
        }
        data = JSON.stringify(data);

    } else {
        //console.log('ELSE HERE')
        data = document.getElementById('requestJsonText').value;
    }
    console.log("URL, request type and content type:", url, requestType, contentType);
    console.log('DATA is:', data);

//if request type is GET, fetch API to create get request
    if (requestType == 'GET') {
        fetch(url, {
                method: 'GET'
            }).then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    } else {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }
});

