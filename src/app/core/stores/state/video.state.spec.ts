// import { TestBed, waitForAsync } from '@angular/core/testing';
// import { NgxsModule, Store } from '@ngxs/store';
// import { VideoState } from './video.state';
// import { VideoAction } from './video.actions';
//
// describe('Video actions', () => {
//   let store: Store;
//
//   beforeEach(waitForAsync () => {
//     void TestBed.configureTestingModule({
//       imports: [NgxsModule.forRoot([VideoState])]
//     }).compileComponents();
//     store = TestBed.inject(Store);
//   }));
//
//   it('should create', () => {
//     expect(store).toBeTruthy();
//   });
//
//   it('should create an action and add an item', () => {
//     store.dispatch(new VideoAction('item-1'));
//     store.select(state => state.video.items).subscribe((items: string[]) => {
//       expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
//     });
//   });
//
// });
