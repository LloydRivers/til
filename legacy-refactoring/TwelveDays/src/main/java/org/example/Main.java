package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        TwelveDays twelve = new TwelveDays(12);
        String result = twelve.print();
        System.out.println(twelve.toString());
        System.out.println(result);
        }
}