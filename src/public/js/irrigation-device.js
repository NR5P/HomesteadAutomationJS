import {Device} from "./device.js"

/**********************************************************************
 * for timed irrigation control
 *********************************************************************/
export class IrrigationDevice extends Device{
    constructor(id, name, pin, notes, state, cycleOnTimeArray, startTimesArray, daysToIrrigate) {
        super(id, name, pin, notes, state);

        this.cycleOnTimeArray = cycleOnTimeArray || [];
        this.startTimesArray = startTimesArray || [];
        this.daysToIrrigate = daysToIrrigate;
        this.btnColor = "#0394fc";
        this.class = "irrigation-device-btn";
            
        console.log("rendering button");
        this.renderBtn();
    }

    /**********************************************************************
     * render settings under button on main page to allow adjustment of 
     * the device
     *********************************************************************/
    renderDeviceSettings(event) {
        let formElement = document.createElement("form");
        formElement.id = "deviceForm";
        formElement.action = "/irrigation";
        formElement.method = "POST";

        const weekdays = ["monday", "tuesday", "wendesday", "thursday", "friday", "saturday", "sunday"];
        let options = "";
        for (let i = 1; i < 11; i += 1) {
            if (Device.pinsUsed.includes(i)) {
                if (i != this.pin)
                    options += `<option disabled>${i}</option>`
            } else {
                options += `<option>${i}</option>`
            }
        }
        let form = `
                <label for="name">Name: </label>           
                <input type="text" id="name" name="name" value="${this.name}">

                <label for="pin">Pin: </label>           
                <select name="pin" id="pin">
                    <option>${this.pin}<option>
                    ${options}
                </select>

                <label for="notes">Notes: </label>           
                <input type="textarea" id="notes" name="notes" value="${this.notes}">

                <div class="daysToIrrigate">
                    ${
                        weekdays.map(day => {
                            if (this.daysToIrrigate.includes(day.charAt(0).toUpperCase() + day.slice(1))) {
                                return `
                                    <label class="day day-on" for="${day}">
                                    <input type="checkbox" class="day-checkbox" id="${day}" name="${day}" value="${day.charAt(0).toUpperCase() + day.slice(1)}" checked>${day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                `
                            } else {
                                return `
                                    <label class="day day-off" for="${day}">
                                    <input type="checkbox" id="${day}" class="day-checkbox" name="${day}" value="${day.charAt(0).toUpperCase() + day.slice(1)}">${day.charAt(0).toUpperCase() + day.slice(1)}</label>
                                `
                            }
                        }).join("") 
                    }
                </div>

                ${
                    this.cycleOnTimeArray.map((element, index) => {
                        return `<div class="times-div"><div class="hr-min-sec-time">
                            <label for="cycleOnTimeHr" class="cycleOnTime">Cycle On Time Hr:Min:Sec </label>
                            <input type="number" class="cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="${element.substring(11, 13)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="${element.substring(14, 16)}">
                            <span class="colon">:</span>   
                            <input type="number" class="cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="${element.substring(17, 19)}">
                        </div>

                        <div class="on-times">
                            <label for="onTime">On Time(s)</label>
                            <div>
                                <input type="time" class="onTime" name="onTime" value="${this.startTimesArray[index]}"><span></span>
                            </div>
                        </div>
                            <button type="button" class="delete-btn">Delete</button>
                        </div>`
                    })
                }
                <button type="button" id="addAnothertime">Add Another Time</button>

                <button type="button" class="form-submit" id="form-submit">Modify</button>
                <button type="button" class="form-delete" id="form-delete">Delete</button>
                <button type="button" class="form-cancel" onclick = "window.location.href = '/';">Cancel</button>
        `;


        formElement.innerHTML = form;

        
        if (event.target.nextSibling == null || event.target.nextSibling.tagName != "FORM") {
            event.target.insertAdjacentElement("afterend", formElement);
        } else {
            event.target.parentNode.removeChild(event.target.nextSibling);
        }

        document.getElementById("addAnothertime").addEventListener("click", (e) => {
            const addAnotherBtn = document.getElementById("addAnothertime");

            const elementToAddStartTime = `<label for="cycleOnTimeHr" class="cycleOnTime">Cycle On Time Hr:Min:Sec </label>
                                            <input type="number" class"cycleOnTimeHr" name="cycleOnTimeHr" step="1" value="">
                                            <span class="colon">:</span>   
                                            <input type="number" class"cycleOnTimeMin" name="cycleOnTimeMin" step="1" value="">
                                            <span class="colon">:</span>   
                                            <input type="number" class"cycleOnTimeSec" name="cycleOnTimeSec" step="1" value="">`;
            const divToAddForStartTime = document.createElement("div");
            divToAddForStartTime.className = "hr-min-sec-time";
            divToAddForStartTime.innerHTML = elementToAddStartTime;

            const elementToAddOnTime = `<label for="onTime">On Time(s)</label>
                                        <div><input type="time" name="onTime"><span></span></div>`;
            const divToAdd = document.createElement("div");
            divToAdd.className = "on-times";
            divToAdd.innerHTML = elementToAddOnTime;

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.type = "button";
            deleteBtn.innerHTML = "Delete";

            const timesDiv = document.createElement("div");
            timesDiv.className = "times-div";
            timesDiv.appendChild(divToAddForStartTime);
            timesDiv.appendChild(divToAdd);
            timesDiv.appendChild(deleteBtn);

            e.currentTarget.parentNode.insertBefore(timesDiv,addAnotherBtn);
        })

        document.getElementById("deviceForm").addEventListener("click", (e) => {
            if (e.target.className === "delete-btn") {
                e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            }
        })
        
        document.getElementById("form-submit").addEventListener("click", () => {
            let data = {
                id : this.id,
                pin : Device.pinsConvertForPi(document.getElementById("pin").value),
                name : document.getElementById("name").value,
                notes : document.getElementById("notes").value,
                cycleOnTimeHr : Array.from(document.getElementsByClassName("cycleOnTimeHr")).map(element => element.value),
                cycleOnTimeMin : Array.from(document.getElementsByClassName("cycleOnTimeMin")).map(element => element.value),
                cycleOnTimeSec : Array.from(document.getElementsByClassName("cycleOnTimeSec")).map(element => element.value),
                onTime : Array.from(document.getElementsByClassName("onTime")).map(element => element.value),
                monday : document.getElementById("monday").checked,
                tuesday : document.getElementById("tuesday").checked,
                wendesday : document.getElementById("wendesday").checked,
                thursday : document.getElementById("thursday").checked,
                friday : document.getElementById("friday").checked,
                saturday : document.getElementById("saturday").checked,
                sunday : document.getElementById("sunday").checked
            }
            fetch("/irrigation", {
                method : "PUT",
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                //if (data.status == 200)
            })
            .catch(error => {
                console.log(error);
            })
        })

        document.getElementById("form-delete").addEventListener("click", () => {
            let data = {
                id : this.id
            }
            fetch("/irrigation", {
                method : "DELETE",
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status == 200)
                    console.log("success");
                    //TODO:
            })
            .catch(error => {
                console.log(error);
            })
        })

        document.querySelector(".daysToIrrigate").addEventListener("click", (e) => {
            if (e.target.nextSibling.checked === true) {
                e.target.nextSibling.checked = false;
            } else {
                e.target.nextSibling.checked = true;
            }
            e.target.classList.toggle("day-off");
            e.target.classList.toggle("day-on");
        })
    }
};