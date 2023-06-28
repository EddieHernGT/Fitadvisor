<?php

namespace App\Http\Controllers;

use App\Models\Medicali;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MedInformationController extends Controller
{
    use ApiResponser;
    public function index()
    {
        $info = Medicali::all();
        return $this->success($info);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $info = Medicali::create($data);
        $info->person_id = $data['person_id'];
        $info->save();
        return $this->success($info, Response::HTTP_CREATED);
    }

    public function show($person_id)
    {
        $info = Medicali::where('person_id', $person_id)->first();
        if ($info) {
            return $this->success($info, Response::HTTP_FOUND);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }

    }

    public function update(Request $request, $person_id)
    {
        $info = Medicali::where('person_id', $person_id)->first();
        $info->fill($request->all());
        $info->save();
        return $this->success($info);

    }

    public function destroy($person_id){
        $info = Medicali::where('person_id', $person_id)->first();
        if ($info) {
            $info->delete();
            return $this->success($info);
        } else {
            return $this->error('User not found', Response::HTTP_NOT_FOUND);
        }
    }
}
