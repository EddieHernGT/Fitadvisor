<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class UserController extends Controller
{
    use ApiResponser;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
    public function login(Request $request){
        $user = User::where('email', $request->input('email'))->first();
        if ($user) {
            $introduced_password=base64_encode($request->input('password'));
            if($introduced_password==$user->password) {
                $user_data[]=$user->id;
                $user_data[]=$user->email;
                return $this->success($user_data, Response::HTTP_FOUND);
            }else{
                return $this->error("Passord error",Response::HTTP_NOT_ACCEPTABLE);
            }
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }
    }
    /**
     * Create an instance of a user
     *
     * @return Illuminate\Http\Response
     */
    public function index(){
        $users=User::all();
        return $this->success($users);
    }
    /**
     * Return specific user data
     *
     * @return Illuminate\Http\Response
     */
    public function store(Request $request){
        $rules=[
            'email'=>'required',
            'password'=>'required|min:8',
        ];
        $this->validate($request,$rules);
        $data = $request->all();
        $data['password'] = base64_encode($request->input('password'));
        $user=User::create($data);
        $userId=$user->id;
        return $this->success(['id'=>$userId]+$user->toArray(),Response::HTTP_CREATED);
    }
    /**
     * Return specific user data
     *
     * @return Illuminate\Http\Response
     */
    public function show($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            return $this->success($user, Response::HTTP_FOUND);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }

    }

    /**
     * Update specific user data
     * @return Illuminate\Http\Response
     */
    public function update(Request $request, $email)
    {
        $rules = [
            'password' => 'min:8',
        ];
        $this->validate($request, $rules);

        $user = User::where('email', $email)->first();

        if ($user) {
            if ($request->has('password')) {
                $decodedPassword = base64_decode($user->password);
                $insertedPassword = $request->input('password');
                if ($decodedPassword !== $insertedPassword) {
                    $user->fill($request->all());
                    $user->password = base64_encode($insertedPassword);
                    $user->save();
                    return $this->success($user);
                }else{
                    return $this->error('Password must change', Response::HTTP_UNPROCESSABLE_ENTITY);

                }
            }else{
                $user->fill($request->all());
                if ($user->isClean()) {
                    return $this->error('At least one value must change', Response::HTTP_UNPROCESSABLE_ENTITY);
                } else {
                    $user->save();
                    return $this->success($user);
                }
            }
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }
    }



    /**
     * Removes specific user data
     * @return Illuminate\Http\Response
     */
    public function destroy($email){
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->delete();
            return $this->success($user);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }
    }

}
