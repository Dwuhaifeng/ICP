import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

actor {
  func quicksort(arr:[var Int],left:Nat,right:Nat){
      if(left>=right) return;
      var pivot = arr[left];
      var i = left;
      var j = right;
      while(i < j){
          while(arr[j] >= pivot and j > i){
              j -= 1;
          };
          arr[i] := arr[j];
          while(pivot > arr[i] and j > i){
              i += 1;
          };
          arr[j] := arr[i];
      };
      arr[i] := pivot;
      if( i >= 1 ) quicksort(arr,left,i-1);
      quicksort(arr,i+1,right);
  };

  func qSort(arr:[Int]) : [Int] {
      var newArr:[var Int] = Array.thaw(arr);
      quicksort(newArr,0,newArr.size()-1);
      Array.freeze(newArr);
  };

  public func quickSort(arr:[Int]) : async [Int] {
      qSort(arr);
  };
}; 