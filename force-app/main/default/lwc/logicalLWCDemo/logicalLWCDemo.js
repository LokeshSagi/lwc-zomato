/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, track, wire } from 'lwc';
import mapDemo from '@salesforce/apex/UtilityClass.mapDemo';

export default class LogicalLWCDemo extends LightningElement {
    @track greeting = 'Welcome Lokesh!!!';
    @track message = 'LWC Methodology';
    @track records;
    @track error;
    @track maps;

    @track contacts = [
        {
            Id : '1332484465619849',
            Name : 'Lokesh'
        },
        {
            Id : '7898465651365844',
            Name : 'Krishna'
        },
        {
            Id : '2131457941564895',
            Name : 'Sagi'
        }
    ];
    @wire(mapDemo) 
    wiredData({error, data}) {
        if(data){   
            this.records = data;
            
        }
        else if(error) {
            alert('wiree');
            this.error = error;
        }
    }

    callApex() {
        mapDemo().then(result=>{
            //alert('result = '+JSON.stringify(result));
            const options = [];
            for(let key in result){
                if(key){
                    options.push({
                        key : key,
                        value : result[key]
                    })
                }
            }
            this.maps = options;
            //alert(JSON.stringify(options));
        })
        .catch(error=>{
            this.error = error;
        })
    }

}