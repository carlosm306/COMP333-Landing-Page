<?php

class BackendTests extends PHPUnit\Framework\TestCase
{
   protected $client;

   protected function setUp() : void{
      parent::setUp();
      $this->client = new GuzzleHttp\Client(["base_uri" => "http://localhost/"]);
   }

   public function testGet_ReviewList() {
      $response = $this->client->request('GET', 'Backend/index.php/user/list');
      $this->assertEquals(200, $response->getStatusCode());
   }

   public function testPost_login() {
    $response = $this->client->request('POST', 'Backend/index.php/user/login', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],
        'json' => [
            "username"=> "user1",
            "password"=> "1234567891011",
            "confirm_password"=> "1234567891011"
        ],
    ]);
    // echo $response->getBody()->getContents();
    $this->assertEquals(200, $response->getStatusCode());
 }

 public function testPost_signup() {
    $randomUsername = 'testuser_' . uniqid();
    $response = $this->client->request('POST', 'Backend/index.php/user/signup', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],
        'json' => [
            "username"=> $randomUsername,
            "password"=> "1234567891011",
            "confirm_password"=> "1234567891011"
        ],
    ]);
    // Delete test user
    $createdWithinLast10Minutes = (time() - strtotime($user['created_at'])) < 600;
    if (strpos($user['username'], 'testuser_') === 0 && $createdWithinLast10Minutes) {
    $userModel->deleteUser($user['username']);
}

    // echo $response->getBody()->getContents();
    $this->assertEquals(201, $response->getStatusCode());
 }

 public function testPost_loginFailed() {
    $response = $this->client->request('POST', 'Backend/index.php/user/login', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ],
        'json' => [
            "username"=> "user1",
            "password"=> "1234567891011asd",
            "confirm_password"=> "1234567891011asd"
        ],
    ]);
    echo $response->getBody()->getContents();
    $this->assertEquals(200, $response->getStatusCode());
 }

 

   public function tearDown() : void{
      parent::tearDown();
      $this->client = null;
   }
}
?>