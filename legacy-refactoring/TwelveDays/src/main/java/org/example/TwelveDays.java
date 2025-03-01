package org.example;

import java.util.HashMap;
import java.util.Map;
/*
* class Bike
*
* static methid
*
* Bike.method
*
* */
public class TwelveDays {
    private final String patrdige = "A partridge in a pear tree.";
    private int maxDays;

    Map<Integer, String> daysToPresents = Map.ofEntries(
            Map.entry(1, "A partridge in a pear tree."),
            Map.entry(2, "Two turtle doves and"),
            Map.entry(3, "Three french hens"),
            Map.entry(4, "Four calling birds"),
            Map.entry(5, "Five golden rings"),
            Map.entry(6, "Six geese a-laying"),
            Map.entry(7, "Seven swans a-swimming"),
            Map.entry(8, "Eight maids a-milking"),
            Map.entry(9, "Nine ladies dancing"),
            Map.entry(10, "Ten lords a-leaping"),
            Map.entry(11, "Eleven pipers piping"),
            Map.entry(12, "Twelve drummers drumming")
    );

    public TwelveDays(int day) {
        this.maxDays = day;
    }

    String print() {
        StringBuilder sb = new StringBuilder("");

        // loop to day (12)
        for(int i = 1; i <= this.maxDays; i++) {
            System.out.println("On the " + DayManager.dayToString(i) + " day of Christmas " + "\nMy true love sent to me;");

            for(int j = i; j > 0; j--) {
                System.out.println(daysToPresents.get(j));
            }
            System.out.println("\n");
        }
        return "";
    }
}



