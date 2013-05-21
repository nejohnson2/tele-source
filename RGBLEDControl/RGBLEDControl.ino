/*
  Tele-Source
  by Nicholas Johnson
  
  with help from Tom Igoe
  
  A simple application to trigger an LED sequence flash based on input from a node server
 
 */

// constants to hold the output pin numbers:
const int light = 13;

void setup() {
  // initiate serial communication:
  Serial.begin(9600);

  // initialize the LED pins as outputs:
  pinMode(light, OUTPUT);
}

void loop() {

  // if there's any serial data in the buffer, read a byte:
  if (Serial.available() > 0) {
    int inByte = Serial.read(); 
    
    if(inByte = 1){
      digitalWrite(light, HIGH);
      delay(500);
        digitalWrite(light, LOW);
        delay(500);
        digitalWrite(light, HIGH);
        delay(500);
        digitalWrite(light, LOW);
        delay(500);
        digitalWrite(light, HIGH);
        delay(1000);
        digitalWrite(light, LOW);
      } else {
        digitalWrite(light, LOW);
      }
  }

}