<?php

namespace App\Http\Controllers;

use App\Models\ScooterHistory;
use App\Http\Requests\StoreScooterHistoryRequest;
use App\Http\Requests\UpdateScooterHistoryRequest;
use App\Models\Scooters;
use Illuminate\Http\Request;

class ScooterHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function HistoryMaintenance(Request $request)
    {

        $data = Scooters::where('id',$request["id"]);

        $dataUpdate = new ScooterHistory([
            'scooter_id' => $request["id"],
            'model_serie' => $data->model_serie,
            'history_status' => 'Envoie en maintenance'
    
        ]);
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
