<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            return [
    //             'title' => 'required',
    // 'thumbnail' => [
    //                 'required',
    //                 'thumbnail',
    //                 'mimes:jpeg,png',
    //                 'mimetypes:thumbnail/jpeg,thumbnail/png,thumbnail/jpg',
    //             ],
            ];
            
    }
    // public function messages()
    // {
    //         return [
    //             'title.required' => 'Tên không được để trống'
    //         ];
    
    // }
    // public function failedValidation(Validator $validator)
    // {
    //         throw new HttpResponseException(response()->json([
    //             'status'   => false,
    //             'message'   => 'Validation errors',
    //             'post'      => $validator->errors()
    //         ]));
    // }   
}