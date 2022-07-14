<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScooterHistoryRequest;
use App\Http\Requests\UpdateScooterHistoryRequest;
use App\Models\ScooterHistory;
use App\Models\Scooters;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScooterHistoryController extends Controller
{

    use ApiResponse;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function HistoryMaintenance(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $scooter = Scooters::where('id', $request->input('id'))->get();

            $location = json_decode($scooter);
            $model_serie = $location[0]->model_serie;

            $dataUpdate = new ScooterHistory([
                'scooter_id' => $request->input('id'),
            'model_serie' => $model_serie,
            'history_status' => 'Envoyé en maintenance'
        ]);
        $dataUpdate->save();

        if (!$dataUpdate) {
            return response()->json(array('success' => 'false', 'message' => "Erreur pour l'historique de maintenance'"), 400);
        }

        $dateFetch = ScooterHistory::all();

        return response()->json(array('success' => 'true', 'data' =>  $dateFetch));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }
    }

    public function HistoryFixing(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        try {

            $scooter = Scooters::where('id', $request->input('id'))->get();

            $location = json_decode($scooter);
            $model_serie = $location[0]->model_serie;

            $dataUpdate = new ScooterHistory([
                'scooter_id' => $request->input('id'),
            'model_serie' => $model_serie,
            'history_status' => 'Envoyé en réparation'
        ]);
        $dataUpdate->save();

        if (!$dataUpdate) {
            return response()->json(array('success' => 'false', 'message' => "Erreur pour l'historique de réparation'"), 400);
        }

        $dateFetch = ScooterHistory::all();

        return response()->json(array('success' => 'true', 'data' =>  $dateFetch));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }
    }


    public function HistoryService(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        try {

            $scooter = Scooters::where('id', $request->input('id'))->get();

            $location = json_decode($scooter);
            $model_serie = $location[0]->model_serie;

            $dataUpdate = new ScooterHistory([
                'scooter_id' => $request->input('id'),
            'model_serie' => $model_serie,
            'history_status' => 'Remis en Service'
        ]);
        $dataUpdate->save();

        if (!$dataUpdate) {
            return response()->json(array('success' => 'false', 'message' => "Erreur pour l'historique de réparation'"), 400);
        }

        $dateFetch = ScooterHistory::all();

        return response()->json(array('success' => 'true', 'data' =>  $dateFetch));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }
    }

    public function HistoryAdd(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $id = DB::table('scooters')->orderBy('id', 'DESC')->first();

            $data = json_decode(json_encode($id), true);

            $scooter = Scooters::where('id', $data)->get();

            $location = json_decode($scooter);
        $id_serie = $location[0]->id;
        $model_serie = $location[0]->model_serie;


        $dataUpdate = new ScooterHistory([
            'model_serie' => $model_serie,
            'history_status' => 'Trotinette ajouté',
            'scooter_id' => $id_serie
        ]);
        $dataUpdate->save();

        if (!$dataUpdate) {
            return response()->json(array('success' => 'false', 'message' => "Erreur pour l'historique de réparation'"), 400);
        }

        $dateFetch = ScooterHistory::all();

        return response()->json(array('success' => 'true', 'data' =>  $dateFetch));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }
    }

    public function HistoryDelete(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $scooter = Scooters::where('id', $request->input('id'))->get();

            $location = json_decode($scooter);
            $model_serie = $location[0]->model_serie;

            $dataUpdate = new ScooterHistory([
                'scooter_id' => $request->input('id'),
                'model_serie' => $model_serie,
                'history_status' => "Trotinette " .$request->input('id') . " supprimé"
            ]);
            $dataUpdate->save();

            if (!$dataUpdate) {
                return response()->json(array('success' => 'false', 'message' => "Erreur pour l'historique de réparation'"), 400);
            }

            $dateFetch = ScooterHistory::all();

            return response()->json(array('success' => 'true', 'data' =>  $dateFetch));

        }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }
    }

    public function List()
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $dateFetch = ScooterHistory::all();

            return response()->json(array('success' => 'true', 'data' => $dateFetch));

        } catch (Exception $e) {
            return $this->fail('erreur', $e->getMessage());
        }
    }




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreScooterHistoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreScooterHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ScooterHistory  $scooterHistory
     * @return \Illuminate\Http\Response
     */
    public function show(ScooterHistory $scooterHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ScooterHistory  $scooterHistory
     * @return \Illuminate\Http\Response
     */
    public function edit(ScooterHistory $scooterHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateScooterHistoryRequest  $request
     * @param  \App\Models\ScooterHistory  $scooterHistory
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateScooterHistoryRequest $request, ScooterHistory $scooterHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ScooterHistory  $scooterHistory
     * @return \Illuminate\Http\Response
     */
    public function destroy(ScooterHistory $scooterHistory)
    {
        //
    }
}
