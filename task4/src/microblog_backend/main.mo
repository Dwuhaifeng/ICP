import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

actor {
  public type Message = {
    msg : Text;
    time : Time.Time;
  };

  public type Microblog = actor{
    follow:shared(Principal) -> async(); //添加关注对象
    follows:shared query () -> async[Principal]; //返回关注列表
    post:shared (Text) -> async(); // 发布新消息
    posts:shared query () -> async [Message];//返回所有发布的消息
    timeline:shared () -> async [Message];//返回所有关注对象发布的消息
  };
  
  var followed :List.List<Principal> = List.nil();

  public shared func follow(id:Principal):async(){
    followed := List.push(id,followed);
  };

  public shared query func follows():async[Principal]{
    List.toArray(followed)
  };

  var message:List.List<Message> = List.nil();

  public shared func post(text:Text):async(){
    let now = Time.now();
    let msg : Message = {
      msg = text;
      time = now;
    };
    message := List.push(msg,message)
  };

  public shared query func posts(since: Time.Time):async[Message]{
    var pick_message:List.List<Message> = List.nil();
    for (msg in Iter.fromList(message)){
      if (msg.time > since){
        pick_message:=List.push(msg,pick_message)
      }
    };
    List.toArray(pick_message)
  };

  public shared func timeline(since: Time.Time):async[Message]{
    var pick_message : List.List<Message> = List.nil();
    for (id in Iter.fromList(followed)){
      let canister : Microblog = actor(Principal.toText(id));
      let msgs = await canister.posts();
      for (msg in Iter.fromArray(msgs)){
        if (msg.time > since){
          pick_message:=List.push(msg,pick_message)
        }
      };
    };
    List.toArray(pick_message)
  };
};
