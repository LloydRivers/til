package org.example;

import java.util.Map;

public class DayManager {
    static Map<Integer, String> daysToPresents = Map.ofEntries(
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

    static String dayToString(Integer id ) {
        return daysToPresents.get(id);
    }
}
