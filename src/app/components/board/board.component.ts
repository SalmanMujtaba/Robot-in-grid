import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {
  gridRows: number;
  gridColumns: number;
  items: Array<number>;
  cells: number;
  currentCell: number;
  // allCells: Array<Element>;
  currentClass: string;
  currentElement: Element;
  lowerBound = 0;
  upperBound = 9;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    this.initializeVariables();
    // this.grid = Array(this.gridRows).fill(0).map(() => Array(this.gridColumns).fill(0));
  }

  ngAfterViewInit() {
    // this.allCells = Array.from(this.elementRef.nativeElement.querySelectorAll('.container__cell'));
    // console.log(document.getElementById('1'));
    this.currentCell = 0;
    this.setCurrentElement(this.currentCell.toString());
    // this.currentElement = document.getElementById(this.currentCell.toString()) as Element;
    this.renderer.addClass(this.getCurrentElement(), this.currentClass);
  }

  initializeVariables() {
    this.currentClass = "container__cell--element";
    this.cells = 36;
    this.gridColumns = 10;
    this.gridRows = this.gridColumns;
    this.items = Array(this.cells).fill(0);

  }
  addClass(id: string) {
    this.setCurrentElement(id);
    this.renderer.addClass(this.getCurrentElement(), this.currentClass);
    this.removeClass();
  }

  getCurrentElement() {
    return this.currentElement;
  }

  setCurrentElement(id: string) {
    this.currentElement = document.getElementById(id);
  }

  removeClass() {
    this.renderer.removeClass(document.getElementById(this.currentCell.toString()), this.currentClass);
  }


  back() {
    if (this.checkBoundsForBack(+this.currentCell)) {
      this.addClass((this.currentCell - 1).toString());
      this.currentCell--;
      console.log("current cell", this.currentCell);
    }
  }

  up() {
    if (this.checkBoundsForUpAdDown(+this.currentCell)) {
      this.addClass((this.currentCell - 6).toString());
      this.currentCell -= 6;
    }
  }

  down() {
    if (this.checkBoundsForUpAdDown(+this.currentCell)) {
      this.addClass((this.currentCell + 6).toString());
      this.currentCell += 6;
      console.log("current cell", this.currentCell);

    }
  }

  forward() {
    if (this.checkBoundsForNext(+this.currentCell)) {
      this.addClass((this.currentCell + 1).toString());
      this.currentCell++;
      console.log("current cell", this.currentCell);
    }
  }

  checkBoundsForUpAdDown(id: number) {
    id++;
    return (id <= this.upperBound && id >= this.lowerBound);
  }

  checkBoundsForNext(id: number) {
    return id === 0 || id % 5 !== 0;
  }

  checkBoundsForBack(id: number) {
    if (id === 0) {
      return false;
    } else {
      return id % 6 !== 0;
    }
  }
}

