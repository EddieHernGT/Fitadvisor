<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;



class PersonController extends Controller
{
    use ApiResponser;
    public function index()
    {
        $people = Person::all();
        return $this->success($people);
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'surname' => 'required',
            'birth_date' => 'required|date',
            'user_id' => 'required'
        ];
        $this->validate($request, $rules);
        $data = $request->all();

        $person = Person::create($data);
        $person->user_id = $data['user_id'];
        $person->save();
        return $this->success($person, Response::HTTP_CREATED);
    }

    public function show($user_id)
    {
        $person = Person::where('user_id', $user_id)->first();
        if ($person) {
            $person_data[]=$person->name;
            $person_data[]=$person->surname;
            $person_data[]=$person->second_surname;
            $person_data[]=$person->birth_date;
            $person_data[]=$person->id;
            return $this->success($person_data, Response::HTTP_FOUND);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }

    }

    public function update(Request $request, $user_id)
    {
        $rules = [
            'birth_date' => 'date',
        ];
        $this->validate($request, $rules);

        $person = Person::where('user_id', $user_id)->first();
        $person->fill($request->all());
        $person->save();
        return $this->success($person);

    }

    public function destroy($user_id){
        $person = Person::where('user_id', $user_id)->first();
        if ($person) {
            $person->delete();
            return $this->success($person);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }
    }

}
