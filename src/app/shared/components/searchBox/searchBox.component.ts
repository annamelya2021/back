import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './searchBox.component.html',

})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSusctiption? : Subscription;



  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';


  @Output()
  public onValue = new EventEmitter<string>()

  @Output()
  public onDebounce = new EventEmitter<string>()



  ngOnInit(): void {
    this.debouncerSusctiption = this.debouncer
    .pipe(
      debounceTime(300))
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy(): void {
    this.debouncerSusctiption?.unsubscribe()
  }

  emitValue(value:string):void{
    this.onValue.emit(value)
     console.log('Emit Value:', value);
  }
  onKeyPress(searchTerm: string){
    this.debouncer.next(searchTerm)
    console.log('Key Pressed:', searchTerm);
  }

}
