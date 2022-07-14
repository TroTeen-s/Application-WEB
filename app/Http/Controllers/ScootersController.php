<?php

namespace App\Http\Controllers;

use App\Models\FixingCenter;
use App\Models\MaintenanceCenter;
use App\Models\Scooters;
use App\Traits\ApiResponse;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ScootersController extends Controller
{

    use ApiResponse;

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */

    public function __invoke(): JsonResponse
    {

        try{

            $MaintenanceList = MaintenanceCenter::all();

            $scooters = Scooters::where('mileage', '>', 150)->where('fixing', '!==', 1)->get();

            $arrayGet = array();

            foreach($scooters as $arrayGet){

                $array = json_decode($MaintenanceList, true);
                $one_item = $array[rand(0, count($array) - 1)];

                $arrayGet ->update([
                    'maintenance' => 1,
                    'last_position_long' => $one_item["last_position_long"],
                    'last_position_lat' => $one_item["last_position_lat"],
                    'maintenance_center_id' => $one_item["id"]
                ]);
            }

            $scooterList = Scooters::all();
            return response()->json(array('data' => $scooterList,'infos' => $scooters));

            }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }

    }

    public function create(Request $request): JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        $attr = $request->validate([
            'model-serie' => 'required|string|min:6'
        ]);

        $scooter =
            new Scooters([
                'acquired_at' => date_create('now'),
                'model_serie' => $attr['model-serie'],
            'last_revision' => date_create('now'),
            'mileage' => 0.0,
            'last_position_long' => 0.0,
            'last_position_lat' => 0.0,
            'available' => true,
            'in_revision' => false
        ]);
        $scooter->save();


        return response()->json(array('data' => $scooter));
    }

    public function active(Request $request): JsonResponse
    {

        $attr = $request->validate([
            'id' => 'required',
            'available' => 'required'

        ]);

        $scooter =
            Scooters::where('id', $attr['id'])
            ->update([
            'available' => !$attr['available'],
        ]);

        $scooter = Scooters::where('id', $attr['id'])->get();

        if (!$scooter) {
            return response()->json(array('success' => 'false', 'message' => "Aucun scooter trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'data' => ['scooter' => $scooter]));
    }

    public function get_maintenance_scoot(): JsonResponse
    {

        try{

        $data = Scooters::whereIn('maintenance', [1])->get();

        if (!$data) {
            return response()->json(array('success' => 'false', 'message' => "Aucun user trouvé"), 400);
        }
        return response()->json(array('success' => 'true', 'data' => $data));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }

    }

    public function get_fixing_scoot(): JsonResponse
    {

        try{

        $data = Scooters::whereIn('fixing', [1])->get();

        if (!$data) {
            return response()->json(array('success' => 'false', 'message' => "Aucun user trouvé"), 400);
        }

        return response()->json(array('success' => 'true', 'data' => $data));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }

    }


    public function deleteFromID(Request $id) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $data = Scooters::where('id', $id["id"])->delete();

            if (!$data) {
                return response()->json(array('success' => 'false', 'message' => "Aucun utilisateur trouvé"), 400);
            }

            $scooter = Scooters::all();

            return response()->json(array('success' => 'true', 'data' => $scooter));

        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }
    }

    public function MaintenanceStatus(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        try {

            $MaintenanceList = MaintenanceCenter::all();

            $data = Scooters::where('id', $request->input('id'));

            $array = json_decode($MaintenanceList, true);
            $one_item = $array[rand(0, count($array) - 1)];

                $data->update([
                    'fixing' => 0,
                    'maintenance' => 1,
                    'maintenance_center_id' => $one_item["id"],
                    'fixing_center_id' => null,
                    'commentary'=>$request->input('commentary')
                    ]);

            if (!$data) {
                return response()->json(array('success' => 'false', 'message' => "Erreur pour la mise en maintenance"), 400);
            }

            $scooter = Scooters::all();

            return response()->json(array('success' => 'true', 'data' =>  $scooter));

        }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }
    }

    public function FixingStatus(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $FixingList = FixingCenter::all();

            $data = Scooters::where('id', $request->input('id'));

            $array = json_decode($FixingList, true);
            $one_item = $array[rand(0, count($array) - 1)];

            $data->update([
                'fixing' => 1,
                'maintenance' => 0,
                'fixing_center_id' => $one_item["id"],
                'maintenance_center_id' => null,
                'commentary'=>$request->input('commentary')
                ]);

        if (!$data) {
            return response()->json(array('success' => 'false', 'message' => "Erreur pour la mise en réparation"), 400);
        }

        $scooter = Scooters::all();

        return response()->json(array('success' => 'true', 'data' =>  $scooter));

            }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }

    }

    public function ServiceStatus(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        try {

            $scooters = Scooters::all();

            $arrayGet = array();

            foreach ($scooters as $arrayGet) {

                $lastlong = rand(4.787 * 100, 4.870 * 100) / 100;
                $lastlat = rand(45.725*100,45.781*100)/100;

                $randomNumberAfter = rand(0,1000000);
                $cLong = "$lastlong$randomNumberAfter";
                $cLat = "$lastlat$randomNumberAfter";

                $data = Scooters::where('id',$request["id"])
                ->update([
                'maintenance' => 0,
                'fixing' => 0,
                'maintenance_center_id' => null,
                'mileage' => 0,
                'last_position_lat' => $cLong,
                'last_position_long' => $cLat,
                'commentary'=> null
            ]);
            }


            if (!$arrayGet) {
                return response()->json(array('success' => 'false', 'message' => "Erreur pour la remise en service"), 400);
            }

            $scooter = Scooters::all();

            return response()->json(array('success' => 'true', 'data' => $scooter));

        }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }
    }

    public function ListMaintenance(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        try {

            $data = Scooters::whereIn('maintenance', [1])->get();

            if (!$data) {
                return response()->json(array('success' => 'false', 'message' => "Aucune trot trouvé"), 400);
            }

            return response()->json(array('success' => 'true', 'data' => $data));


        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }


    }

    public function ListFixing(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }

        try {

            $data = Scooters::whereIn('fixing', [1])->get();

            if (!$data) {
                return response()->json(array('success' => 'false', 'message' => "Aucune trot trouvé"), 400);
            }

            return response()->json(array('success' => 'true', 'data' => $data));


        }catch(Exception $e){
            return $this->fail('erreur', $e->getMessage());
        }

    }

    public function addScoot(Request $request) : JsonResponse
    {
        if (auth()->user()->role !== "admin") {
            return $this->fail("Non authorisé.");
        }


        $lastlong = rand(4.787 * 100, 4.870 * 100) / 100;
        $lastlat = rand(45.725 * 100, 45.781 * 100) / 100;

        $randomNumberAfter = rand(0, 1000000);
        $cLong = "$lastlong$randomNumberAfter";
        $cLat = "$lastlat$randomNumberAfter";

        $body = json_decode($request->getContent());
        $serie = $body->{"serie"};

        // return response()->json(array('success' => 'true', 'data' => $serie));
        // exit;

        

        try{

            $scooter =
                new Scooters([
                'acquired_at' => date_create('now'),
                'model_serie' => $serie,
                'last_revision' => date_create('now'),
                'mileage' => 0.0,
                'last_position_lat' => $cLong,
                'last_position_long' => $cLat,
                'maintenance' => 0,
                'fixing' => 0,
            ]);
            $scooter->save();

            $scooterList = Scooters::all();

            return response()->json(array('success' => 'true', 'data' => $scooterList));

        }catch(Exception $e){
                return $this->fail('erreur', $e->getMessage());
            }
    }
}
