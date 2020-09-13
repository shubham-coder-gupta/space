import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, find } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SpaceX';
  dataList: any;
  photoUrl: any;
  param={};
  chips = [
    {name: '2008',state:false},
    {name: '2009',state:false},
    {name: '2010',state:false},
    {name: '2011',state:false},
    {name: '2012',state:false},
    {name: '2013',state:false},
    {name: '2014',state:false},
    {name: '2015',state:false},
    {name: '2016',state:false},
    {name: '2017',state:false},
    {name: '2018',state:false},
    {name: '2019',state:false},
    {name: '2020',state:false}
  ];
  chipLaunch=[
    {name:'true',state:false},
    {name:'false',state:false},
  ]
  chipLanding=[
    {name:'true',state:false},
    {name:'false',state:false},
  ]
  noResult: any;

  constructor(private service:ProductService,private sanitizer:DomSanitizer,
    private router:Router,private _route:ActivatedRoute
    ){

   }
   ngOnInit(){
    this._route.queryParams.pipe(debounceTime(100))
    .subscribe(params => {
      if(params && Object.keys(params).length>0){
        for(let i in params){
          this.param[i]=params[i]
        }
      this.upadateFilters(this.param);  
      this.getListing(params)
      }
      else{
        this.getListing();
      }
    });

   }
   upadateFilters(data){
    for(let i in data){

    if(i=='launch_year'){
     this.chips.forEach(function(index){
      if(index['name']==data[i]){
        index['state']=true
      }
     }      
     )
    }
    else if(i=='launch_success'){
      this.chipLaunch.forEach(function(index){
       if(index['name']==data[i]){
         index['state']=true
       }
      }      
      )
     }
     else if(i=='launch_landing'){
      this.chipLanding.forEach(function(index){
       if(index['name']==data[i]){
         index['state']=true
       }
      }      
      )
     }

   }
  }
   getListing(params?){
    this.service.getListing(params).subscribe(
      (data: any) => {
        if (data.errCode == -1) {
          // this.toastr.showLoadError(data.message, { src: this.compName });
        } else {
          this.dataList = data;
          // this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(this.dataList[0]['links']['mission_patch']);
          this.dataList &&this.dataList.length==0?this.noResult=true:this.noResult=false 
        }       
        // this.loaderService.deActivate();
      },
      error => {
        // this.toastr.showInternalServerError(error);
        // this.loaderService.deActivate();
      //  this.dataTableService.rerenderSingle('dtTriggerMvlanProfile');
      });

   }
   changeSelected(name,evt,$event?){
     if($event.selected){
     this.param[name]=evt
    //  this.getListing(this.param)
     this.router.navigate([], {
      queryParams: {
        [name]:evt
      },
      queryParamsHandling: 'merge'
    });
     }
   }
   ngOnDestroy(){
    //  this._route.queryParams.subscribe()
   }
  }
  
