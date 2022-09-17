import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Message { 'msg' : string, 'time' : Time }
export type Time = bigint;
export interface _SERVICE {
  'follow' : ActorMethod<[Principal], undefined>,
  'follows' : ActorMethod<[], Array<Principal>>,
  'post' : ActorMethod<[string], undefined>,
  'posts' : ActorMethod<[Time], Array<Message>>,
  'timeline' : ActorMethod<[Time], Array<Message>>,
}
